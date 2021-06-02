package ro.marathon.commonAPI.citizens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CitizenRepository extends JpaRepository<CitizenProfile,Long> {

    @Query(value="WITH alfa as (SELECT * from user where username=?1)" +
            "SELECT citizenProfile.id, idCredentials, nume, prenume, telefon, puncte from citizenProfile,alfa where citizenProfile.idCredentials=alfa.id",nativeQuery = true)
    CitizenProfile findByIdCitizen(String username);

    @Query(value="SELECT id from user where username=?1", nativeQuery = true)
    Long getIdCredentials(String username);

    @Modifying
    @Query(value="INSERT INTO citizenProfile (idCredentials, nume, prenume, telefon, puncte) VALUES (?1, ?2, ?3, ?4, 0)",nativeQuery = true)
    @Transactional
    void addCitizen(Long idCreds, String name, String surname, String phone);

    @Query(value="WITH userTable as (SELECT * from user where username=?1)\n" +
            "SELECT citizenProfile.id from citizenProfile, userTable where citizenProfile.idCredentials = userTable.id;",nativeQuery = true)
    Long getCitizenId(String username);

    @Query(value="SELECT * from citizenProfile order by puncte desc limit 10", nativeQuery = true)
    List<CitizenProfile> getClasament();
}
