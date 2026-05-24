package FurnitureShop.com.example.FurnitureShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {

    private Long id;

    private String username;

    private String email;

    private String role;

    private String token;

    private LocalDateTime createdAt;
}