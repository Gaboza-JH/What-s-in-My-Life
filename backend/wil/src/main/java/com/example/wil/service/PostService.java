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
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public PostDTO save(PostDTO postDTO){
        Post post = makePost(postDTO);
        post = postRepository.save(post);
        return makePostDTO(post);
    }

    public List<PostDTO> findAll() {
        List<Post> postList = postRepository.findAll();
        return makePostDTOList(postList);
    }


    public List<PostDTO> delete(int postId) {
        Optional<Post> foundPost = postRepository.findById(postId);
        foundPost.ifPresent(post -> {
            postRepository.delete(post);
        });
        List<Post> postList = postRepository.findAll();
        return makePostDTOList(postList);
    }

    public PostDTO update(int postId, PostDTO postDTO) {
        Post post = postRepository.getById(postId);
        post.setContent(postDTO.getContent());
        post.setShown(postDTO.isShown());
        post = postRepository.save(post);
        return makePostDTO(post);
    }

    private Post makePost(PostDTO postDTO){
        User user = userRepository.getById(postDTO.getUserId());
        return Post
                .builder()
                .postId(postDTO.getPostId())
                .content(postDTO.getContent())
                .shown(postDTO.isShown())
                .user(user)
                .build();
    }

    private PostDTO makePostDTO(Post post){
        return PostDTO
                .builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .shown(post.isShown())
                .userId(post.getUser().getId())
                .build();
    }

    private List<PostDTO> makePostDTOList(List<Post> postList){
        List<PostDTO> postDTOList = new ArrayList<>();

        for (Post post : postList) {
            postDTOList.add(makePostDTO(post));
        }
        return postDTOList;
    }






}
