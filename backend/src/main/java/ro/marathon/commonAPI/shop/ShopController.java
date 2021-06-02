package ro.marathon.commonAPI.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.marathon.commonAPI.config.JwtTokenUtil;

import java.util.List;
import java.util.Objects;

@RestController
public class ShopController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ServiceRepository serviceRepository;
    private final ProductRepository productRepository;

    ShopController(ServiceRepository repository1, ProductRepository repository2){
        this.serviceRepository =repository1;
        this.productRepository =repository2;
    }

    @GetMapping("/services")
    ResponseEntity<List<Service>> getAllServices(){
        return ResponseEntity.ok(Objects.requireNonNull(serviceRepository.findAll()));
    }

    @GetMapping("/products")
    ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(Objects.requireNonNull(productRepository.findAll()));
    }

}
