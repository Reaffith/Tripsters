package com.example.tripsters.mapper;

<<<<<<< HEAD
import com.example.tripsters.config.MapperConfig;
=======
import com.example.tripsters.dto.vote.VoteOptionResponseDto;
>>>>>>> front-deploy
import com.example.tripsters.dto.vote.VoteResponseDto;
import com.example.tripsters.model.Vote;
import com.example.tripsters.model.VoteOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
=======
>>>>>>> front-deploy

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

<<<<<<< HEAD
@Mapper(config = MapperConfig.class, uses = VoteOptionMapper.class)
public abstract class VoteMapper {

    @Autowired
    protected VoteOptionMapper voteOptionMapper;

    @Mapping(source = "trip.id", target = "tripId")
    @Mapping(source = "voteOptions", target = "voteOptions", qualifiedByName = "mapVoteOptions")
    public abstract VoteResponseDto toDto(Vote vote);

    @Named("mapVoteOptions")
    protected List<String> mapVoteOptions(Set<VoteOption> voteOptions) {
        return voteOptions.stream()
                .map(voteOption -> voteOptionMapper.toDto(voteOption).getOptionText())
                .collect(Collectors.toList());
    }
}
=======
@Mapper(componentModel = "spring")
public interface VoteMapper {

    @Mapping(source = "voteOptions", target = "voteOptions", qualifiedByName = "mapVoteOptions")
    VoteResponseDto toDto(Vote vote);

    @Named("mapVoteOptions")
    default List<VoteOptionResponseDto> mapVoteOptions(Set<VoteOption> voteOptions) {
        return voteOptions.stream()
                          .map(this::toDto)
                          .collect(Collectors.toList());
    }

    VoteOptionResponseDto toDto(VoteOption voteOption);
}
>>>>>>> front-deploy
