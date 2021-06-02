package ro.marathon.commonAPI.shop;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="Produse")
public class Product {

    private Long id;
    private String nume;
    private String descriere;
    private String cantitate;
    private Long cost;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }
}
