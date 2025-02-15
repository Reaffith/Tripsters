package com.example.tripsters.service;

import com.example.tripsters.dto.vote.CreateVoteRequestDto;
import com.example.tripsters.dto.vote.VoteOptionResponseDto;
import com.example.tripsters.dto.vote.VoteResponseDto;

import java.util.List;

public interface VoteService {
    VoteResponseDto createVote(CreateVoteRequestDto requestDto);

    List<VoteOptionResponseDto> getVoteOptions(Long voteId);

    List<VoteResponseDto> getVotesForCurrentTrip(Long tripId);

    VoteResponseDto getVote(Long voteId);

    VoteOptionResponseDto voteForOption(Long voteId, Long voteOptionId);

    VoteResponseDto finishVote(Long voteId);
}