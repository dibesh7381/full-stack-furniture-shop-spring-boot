package FurnitureShop.com.example.FurnitureShop.controller;

import FurnitureShop.com.example.FurnitureShop.dto.*;
import FurnitureShop.com.example.FurnitureShop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://full-stack-furniture-shop-spring-bo-lovat.vercel.app")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<ApiResponseDto<ProductResponseDto>> addProduct(
            @ModelAttribute AddProductRequestDto request,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        ProductResponseDto response =
                productService.addProduct(
                        userId,
                        request
                );

        ApiResponseDto<ProductResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Product added successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @PutMapping("/{productId}")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<ApiResponseDto<ProductResponseDto>> updateProduct(
            @PathVariable Long productId,
            @ModelAttribute UpdateProductRequestDto request,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        ProductResponseDto response =
                productService.updateProduct(
                        userId,
                        productId,
                        request
                );

        ApiResponseDto<ProductResponseDto> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "Product updated successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @GetMapping("/my-products")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<ApiResponseDto<List<ProductResponseDto>>> getMyProducts(
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        List<ProductResponseDto> response =
                productService.getMyProducts(userId);

        ApiResponseDto<List<ProductResponseDto>> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "My products fetched successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @GetMapping("/all-products")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponseDto<List<ProductResponseDto>>> getAllProducts() {

        List<ProductResponseDto> response =
                productService.getAllProducts();

        ApiResponseDto<List<ProductResponseDto>> apiResponse =
                new ApiResponseDto<>(
                        true,
                        "All products fetched successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(apiResponse);
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<ApiResponseDto<String>> deleteProduct(
            @PathVariable Long productId,
            Authentication authentication
    ) {

        Long userId = (Long) authentication.getPrincipal();

        String response =
                productService.deleteProduct(
                        userId,
                        productId
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
}
