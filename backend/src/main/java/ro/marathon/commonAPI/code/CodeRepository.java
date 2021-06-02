package ro.marathon.commonAPI.code;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CodeRepository extends JpaRepository<Code,Long> {

    @Query(value="WITH userTable as (SELECT * from user where username=?1),\n" +
            "citizenTable as (SELECT citizenProfile.id from citizenProfile,userTable where userTable.id=citizenProfile.idCredentials)\n" +
            "SELECT code.id, code.code, code.points from code,citizenTable,citizenProfileToCode where citizenTable.id=citizenProfileToCode.idCitizen and citizenProfileToCode.idCode=code.id",nativeQuery = true)
    List<Code> findCodesByUser(String username);

    @Query(value="WITH userTable as (SELECT * from user where username=?1),\n" +
            "citizenTable as (SELECT citizenProfile.id from citizenProfile,userTable where userTable.id=citizenProfile.idCredentials)\n" +
            "SELECT SUM(code.points) AS suma from code,citizenTable,citizenProfileToCode where citizenTable.id=citizenProfileToCode.idCitizen and citizenProfileToCode.idCode=code.id", nativeQuery = true)
    Long findPointsOfUser(String username);

    @Query(value="SELECT id from code where code=?1",nativeQuery = true)
    Long checkExistence(String code);

    @Modifying
    @Query(value="INSERT INTO citizenProfileToCode(idCitizen, idCode) VALUES (?1, ?2)", nativeQuery = true)
    @Transactional
    void addCodeToUser(Long citizenID, Long codeID);

    @Query(value="SELECT COUNT(id) from citizenProfileToCode where idCitizen=?1 and idCode=?2", nativeQuery = true)
    Long checkCodeToUserExistence(Long idCitizen, Long idCode);
}
