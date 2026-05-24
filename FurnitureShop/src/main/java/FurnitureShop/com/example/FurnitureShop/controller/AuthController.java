package FurnitureShop.com.example.FurnitureShop.controller;

import FurnitureShop.com.example.FurnitureShop.dto.*;
import FurnitureShop.com.example.FurnitureShop.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponseDto<SignupResponseDto>> signup(
            @RequestBody SignupRequestDto request
    ) {

        SignupResponseDto response =
                authService.signup(request);

        ApiResponseDto<SignupResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "User registered successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponseDto<LoginResponseDto>> login(
            @RequestBody LoginRequestDto request
    ) {

        LoginResponseDto response =
                authService.login(request);

        ApiResponseDto<LoginResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "User login successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponseDto<ProfileResponseDto>> getProfile(
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        ProfileResponseDto response = authService.getProfile(userId);

        ApiResponseDto<ProfileResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Profile fetched successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @PutMapping("/become-seller")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<BecomeSellerResponseDto>> becomeSeller(
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        BecomeSellerResponseDto response =
                authService.becomeSeller(userId);

        ApiResponseDto<BecomeSellerResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Seller account activated successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }
}