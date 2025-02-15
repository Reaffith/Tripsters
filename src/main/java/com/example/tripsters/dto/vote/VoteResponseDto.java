package com.example.tripsters.dto.vote;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class VoteResponseDto {
    @NotNull
    private Long id;
    @NotNull
    private Long tripId;
    @NotBlank
    private String title;
    private List<VoteOptionResponseDto> voteOptions;
    private boolean ifFinished;
}