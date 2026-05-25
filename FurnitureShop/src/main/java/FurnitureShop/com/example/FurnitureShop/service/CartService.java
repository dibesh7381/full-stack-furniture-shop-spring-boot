package FurnitureShop.com.example.FurnitureShop.service;

import FurnitureShop.com.example.FurnitureShop.dto.CartResponseDto;
import FurnitureShop.com.example.FurnitureShop.entity.Cart;
import FurnitureShop.com.example.FurnitureShop.entity.Product;
import FurnitureShop.com.example.FurnitureShop.entity.User;
import FurnitureShop.com.example.FurnitureShop.repository.CartRepository;
import FurnitureShop.com.example.FurnitureShop.repository.ProductRepository;
import FurnitureShop.com.example.FurnitureShop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    public CartResponseDto addToCart(
            Long userId,
            Long productId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        if (product.getStock() <= 0) {
            throw new RuntimeException("Product out of stock");
        }

        List<Cart> userCart =
                cartRepository.findByUserId(userId);

        Cart existingCart = userCart.stream()
                .filter(cart ->
                        cart.getProduct()
                                .getId()
                                .equals(productId)
                )
                .findFirst()
                .orElse(null);

        if (existingCart != null) {

            existingCart.setQuantity(
                    existingCart.getQuantity() + 1
            );

            product.setStock(
                    product.getStock() - 1
            );

            productRepository.save(product);

            Cart updatedCart =
                    cartRepository.save(existingCart);

            return mapToResponse(updatedCart);
        }

        Cart cart = new Cart();

        cart.setUser(user);

        cart.setProduct(product);

        cart.setQuantity(1);

        product.setStock(
                product.getStock() - 1
        );

        productRepository.save(product);

        Cart savedCart =
                cartRepository.save(cart);

        return mapToResponse(savedCart);
    }

    public List<CartResponseDto> getMyCart(
            Long userId
    ) {

        return cartRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CartResponseDto increaseQuantity(
            Long userId,
            Long cartId
    ) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found")
                );

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        Product product = cart.getProduct();

        if (product.getStock() <= 0) {
            throw new RuntimeException("No more stock available");
        }

        cart.setQuantity(
                cart.getQuantity() + 1
        );

        product.setStock(
                product.getStock() - 1
        );

        productRepository.save(product);

        Cart updatedCart =
                cartRepository.save(cart);

        return mapToResponse(updatedCart);
    }

    public CartResponseDto decreaseQuantity(
            Long userId,
            Long cartId
    ) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found")
                );

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        Product product = cart.getProduct();

        if (cart.getQuantity() > 1) {

            cart.setQuantity(
                    cart.getQuantity() - 1
            );

            product.setStock(
                    product.getStock() + 1
            );

            productRepository.save(product);

            Cart updatedCart =
                    cartRepository.save(cart);

            return mapToResponse(updatedCart);
        }

        product.setStock(
                product.getStock() + 1
        );

        productRepository.save(product);

        cartRepository.delete(cart);

        return null;
    }

    public String deleteCartItem(
            Long userId,
            Long cartId
    ) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found")
                );

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        Product product = cart.getProduct();

        product.setStock(
                product.getStock() + cart.getQuantity()
        );

        productRepository.save(product);

        cartRepository.delete(cart);

        return "Cart item removed successfully";
    }

    public String clearCart(
            Long userId
    ) {

        List<Cart> cartItems =
                cartRepository.findByUserId(userId);

        for (Cart cart : cartItems) {

            Product product = cart.getProduct();

            product.setStock(
                    product.getStock() + cart.getQuantity()
            );

            productRepository.save(product);

            cartRepository.delete(cart);
        }

        return "Cart cleared successfully";
    }

    private CartResponseDto mapToResponse(
            Cart cart
    ) {

        Product product = cart.getProduct();

        Double totalPrice =
                product.getPrice() * cart.getQuantity();

        return new CartResponseDto(
                cart.getId(),
                product.getId(),
                product.getType(),
                product.getImageUrl(),
                product.getPrice(),
                cart.getQuantity(),
                product.getStock(),
                totalPrice
        );
    }
}