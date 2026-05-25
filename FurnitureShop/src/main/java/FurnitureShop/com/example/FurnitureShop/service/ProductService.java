package FurnitureShop.com.example.FurnitureShop.service;

import FurnitureShop.com.example.FurnitureShop.config.CloudinaryConfig;
import FurnitureShop.com.example.FurnitureShop.dto.AddProductRequestDto;
import FurnitureShop.com.example.FurnitureShop.dto.ProductResponseDto;
import FurnitureShop.com.example.FurnitureShop.dto.UpdateProductRequestDto;
import FurnitureShop.com.example.FurnitureShop.entity.Product;
import FurnitureShop.com.example.FurnitureShop.entity.User;
import FurnitureShop.com.example.FurnitureShop.repository.ProductRepository;
import FurnitureShop.com.example.FurnitureShop.repository.UserRepository;
import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final Cloudinary cloudinary;

    private final CloudinaryConfig cloudinaryConfig;

    public ProductResponseDto addProduct(
            Long userId,
            AddProductRequestDto request
    ) {

        User seller = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        String imageUrl = cloudinaryConfig.uploadImage(
                request.getImage(),
                cloudinary
        );

        Product product = new Product();

        product.setType(request.getType());

        product.setStock(request.getStock());

        product.setPrice(request.getPrice());

        product.setImageUrl(imageUrl);

        product.setSeller(seller);

        Product savedProduct =
                productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    public ProductResponseDto updateProduct(
            Long userId,
            Long productId,
            UpdateProductRequestDto request
    ) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        if (!product.getSeller().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getType() != null) {
            product.setType(request.getType());
        }

        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }

        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }

        if (request.getImage() != null &&
                !request.getImage().isEmpty()) {

            String imageUrl =
                    cloudinaryConfig.uploadImage(
                            request.getImage(),
                            cloudinary
                    );

            product.setImageUrl(imageUrl);
        }

        Product updatedProduct =
                productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    public List<ProductResponseDto> getMyProducts(
            Long userId
    ) {

        User seller = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return productRepository.findBySeller(seller)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<ProductResponseDto> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public String deleteProduct(
            Long userId,
            Long productId
    ) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        if (!product.getSeller().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        productRepository.delete(product);

        return "Product deleted successfully";
    }

    private ProductResponseDto mapToResponse(
            Product product
    ) {

        return new ProductResponseDto(
                product.getId(),
                product.getType(),
                product.getStock(),
                product.getPrice(),
                product.getImageUrl(),
                product.getSeller().getId(),
                product.getSeller().getUsername(),
                product.getCreatedAt()
        );
    }
}
