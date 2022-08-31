package com.example.wil.service;

import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public PostDTO putUpPost(PostDTO postDTO){
        Post post = transformPost(postDTO);
        post = postRepository.save(post);
        return transformPostDTO(post);
    }

    public List<PostDTO> findAllPosts() {
        List<Post> postList = postRepository.findAll();
        return transformPostDTOList(postList);
    }

    public PostDTO findPostByPostId(int postId) {
        Post foundPost = postRepository.getReferenceById(postId);
        return transformPostDTO(foundPost);
    }

    public List<PostDTO> deletePost(int postId) {
        Post foundPost = postRepository.getReferenceById(postId);
        postRepository.delete(foundPost);
        List<Post> postList = postRepository.findAll();
        return transformPostDTOList(postList);
    }

    public PostDTO updatePost(int postId, PostDTO postDTO) {
        Post foundPost = postRepository.getReferenceById(postId);
        foundPost.setContent(postDTO.getContent());
        foundPost.setShown(postDTO.isShown());
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
                .build();
    }

    private PostDTO transformPostDTO(Post post){
        return PostDTO
                .builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .shown(post.isShown())
                .createDate(post.getCreateDate())
                .userId(post.getUser().getId())
                .build();
    }

    private List<PostDTO> transformPostDTOList(List<Post> postList){
        List<PostDTO> postDTOList = new ArrayList<>();
        for (Post post : postList) {
            postDTOList.add(transformPostDTO(post));
        }
        return postDTOList;
    }

}
