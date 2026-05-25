package FurnitureShop.com.example.FurnitureShop.controller;

import FurnitureShop.com.example.FurnitureShop.dto.ApiResponseDto;
import FurnitureShop.com.example.FurnitureShop.dto.CartResponseDto;
import FurnitureShop.com.example.FurnitureShop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://full-stack-furniture-shop-spring-bo-lovat.vercel.app")
public class CartController {

    private final CartService cartService;

    @PostMapping("/{productId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<CartResponseDto>> addToCart(
            @PathVariable Long productId,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        CartResponseDto response =
                cartService.addToCart(
                        userId,
                        productId
                );

        ApiResponseDto<CartResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Product added to cart successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<List<CartResponseDto>>> getMyCart(
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        List<CartResponseDto> response =
                cartService.getMyCart(userId);

        ApiResponseDto<List<CartResponseDto>> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Cart fetched successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @PutMapping("/increase/{cartId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<CartResponseDto>> increaseQuantity(
            @PathVariable Long cartId,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        CartResponseDto response =
                cartService.increaseQuantity(
                        userId,
                        cartId
                );

        ApiResponseDto<CartResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Quantity increased successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @PutMapping("/decrease/{cartId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<CartResponseDto>> decreaseQuantity(
            @PathVariable Long cartId,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        CartResponseDto response =
                cartService.decreaseQuantity(
                        userId,
                        cartId
                );

        ApiResponseDto<CartResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Quantity decreased successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @DeleteMapping("/{cartId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<String>> deleteCartItem(
            @PathVariable Long cartId,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        String response =
                cartService.deleteCartItem(
                        userId,
                        cartId
                );

        ApiResponseDto<String> apiResponse =
                new ApiResponseDto<>(
                        true,
                        response,
                        null
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @DeleteMapping("/clear")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponseDto<String>> clearCart(
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        String response =
                cartService.clearCart(userId);

        ApiResponseDto<String> apiResponse =
                new ApiResponseDto<>(
                        true,
                        response,
                        null
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }
}