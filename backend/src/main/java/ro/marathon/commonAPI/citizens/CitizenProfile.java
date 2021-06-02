package ro.marathon.commonAPI.citizens;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="citizenProfile")
public class CitizenProfile {
    private Long id;
    private Long idCredentials;
    private String nume;
    private String prenume;
    private String telefon;
    private Long puncte;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }
}
