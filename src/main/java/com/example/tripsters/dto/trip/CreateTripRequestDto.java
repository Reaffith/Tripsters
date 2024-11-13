package com.example.tripsters.dto.trip;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTripRequestDto {
    @NotBlank
    private String destination;
    @NotBlank
    private String startDate;
    @NotBlank
    private String endDate;
<<<<<<< HEAD
    @NotBlank
    private String startAdress;
    @NotBlank
    private String finishAdress;
=======
>>>>>>> front-deploy
}
