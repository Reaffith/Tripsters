package com.example.tripsters.dto.vote;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class VoteResponseDto {
    @NotNull
    private Long id;
    @NotNull
    private Long tripId;
<<<<<<< HEAD
    private List<String> voteOptions;
=======
    private List<VoteOptionResponseDto> voteOptions;
>>>>>>> front-deploy
}
