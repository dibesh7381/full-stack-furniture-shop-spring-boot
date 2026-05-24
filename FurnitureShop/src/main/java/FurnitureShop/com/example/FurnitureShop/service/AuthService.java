package FurnitureShop.com.example.FurnitureShop.service;

import FurnitureShop.com.example.FurnitureShop.dto.*;
import FurnitureShop.com.example.FurnitureShop.entity.User;
import FurnitureShop.com.example.FurnitureShop.repository.UserRepository;
import FurnitureShop.com.example.FurnitureShop.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public SignupResponseDto signup(SignupRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        return new SignupResponseDto(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getCreatedAt()
        );
    }

    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        boolean isPasswordMatch = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!isPasswordMatch) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getRole()
        );

        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                token,
                user.getCreatedAt()
        );
    }

    public ProfileResponseDto getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return new ProfileResponseDto(
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    public BecomeSellerResponseDto becomeSeller(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        user.setRole("SELLER");

        User updatedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(
                updatedUser.getId(),
                updatedUser.getRole()
        );

        return new BecomeSellerResponseDto(
                updatedUser.getId(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getRole(),
                token,
                updatedUser.getCreatedAt()
        );
    }
}