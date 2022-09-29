package com.example.wil.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Image;
import com.example.wil.model.Likes;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.ImageRepository;
import com.example.wil.repository.LikesRepository;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ImageRepository imgRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LikesRepository likesRepository;


    @Autowired
    private ImageService imgService;


    @Transactional
    public PostDTO putUpPost(PostDTO postDTO, List<String> imgPaths) {
        Post post = transformPost(postDTO);
        post = postRepository.save(post);

        List<String> imgUrlList = new ArrayList<>();
        if(!imgPaths.isEmpty()) {
            for (String imgUrl : imgPaths) {
                Image img = new Image(imgUrl, post);
                imgRepository.save(img);
                imgUrlList.add(imgUrl);
            }
        }
        return transformPostDTO(post);
    }

    @Transactional
    public PostDTO putUpPost(Integer userId, PostDTO postDTO, List<String> imgPaths) {
        Post post = transformPost(postDTO, userId);
        post = postRepository.save(post);

        List<String> imgUrlList = new ArrayList<>();

        if(!imgPaths.isEmpty()) {
            for (String imgUrl : imgPaths) {
                Image img = new Image(imgUrl, post);
                imgRepository.save(img);
                System.out.println("img repository success");
                imgUrlList.add(imgUrl);
            }
        }
        return transformPostDTO(post);
    }

    public List<PostDTO> findAllPosts() {
        List<Post> postList = postRepository.findAll(Sort.by(Sort.Direction.DESC, "postId"));
        List<Image> imageList = imgRepository.findAll();
        List<PostDTO> postDTO = transformPostDTOList(postList);
        return transformPostDTOList(postList);
    }

    public PostDTO findPostByPostId(int postId) {
        Post foundPost = postRepository.getReferenceById(postId);
        return transformPostDTO(foundPost);
    }

    public List<PostDTO> findAllPostByUserId(int userId) {
        Optional<User> user = userRepository.findById(userId);
        List<Post> foundPost = postRepository.findAllByUser(user, Sort.by(Sort.Direction.DESC, "postId"));
        return transformPostDTOList(foundPost);
    }


    public String deletePost(int postId) {
        // post DB 삭제
        Post foundPost = postRepository.getReferenceById(postId);
        List<Post> postList = postRepository.findAll();
        
        //s3 버킷에 있는 이미지 및 image_post DB 모두 삭제
        List<Image> imgs = imgRepository.findAllByPost(foundPost);
        imgService.deleteS3(imgs);
        postRepository.delete(foundPost);

        return "게시물 삭제 완료";
    }

    public PostDTO updatePost(int postId, PostDTO postDTO) {
        Post foundPost = postRepository.getReferenceById(postId);
        foundPost.setSenti(postDTO.getSenti());
        Post updatedPost = postRepository.save(foundPost);
        return transformPostDTO(updatedPost);
    }

    private Post transformPost(PostDTO postDTO){
        User user = userRepository.getReferenceById(postDTO.getUserId());
        return Post
                .builder()
                .postId(postDTO.getPostId())
                .content(postDTO.getContent())
                .shown(postDTO.isShown())
                .createDate(postDTO.getCreateDate())
                .user(user)
                .senti(postDTO.getSenti())
                .build();
    }

    private Post transformPost(PostDTO postDTO, Integer userId){
        User user = userRepository.getReferenceById(userId);
        return Post
                .builder()
                .postId(postDTO.getPostId())
                .content(postDTO.getContent())
                .shown(postDTO.isShown())
                .createDate(postDTO.getCreateDate())
                .user(user)
                .build();
    }

    private PostDTO transformPostDTO(Post post){
        List<Image> imageList = imgRepository.findAllByPost(post);
        return PostDTO
                .builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .shown(post.isShown())
                .createDate(post.getCreateDate())
                .userId(post.getUser().getId())
                .imgList(imageList)
                .senti(post.getSenti())
                .build();
    }

    private List<PostDTO> transformPostDTOList(List<Post> postList){
        List<PostDTO> postDTOList = new ArrayList<>();
        for (Post post : postList) {
            postDTOList.add(transformPostDTO(post));
        }
        return postDTOList;
    }

    public List<PostDTO> topLike() {
        List<Likes> likes = likesRepository.findGroupByPostId();
        List<Post> postList = new ArrayList<>();
        for (Likes like:likes){
            int postId = like.getPostId().getPostId();
            Post post = postRepository.getReferenceById(postId);
            postList.add(post);
        }
        return transformPostDTOList(postList);
    }


}
