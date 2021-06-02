package ro.marathon.commonAPI.events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {
    @Query(value="WITH userTable as (SELECT * from user where username=?1),\n" +
            "citizenTable as (SELECT citizenProfile.id from citizenProfile,userTable where userTable.id=citizenProfile.idCredentials),\n" +
            "codeTable as (SELECT code.id from code,citizenTable,citizenProfileToCode where citizenTable.id=citizenProfileToCode.idCitizen and citizenProfileToCode.idCode=code.id)\n" +
            "SELECT Event.id, Event.name, Event.description, Event.idCode from Event, codeTable where Event.idCode = codeTable.id", nativeQuery = true)
    List<Event> getEventsForUser(String username);

    @Query(value="SELECT * from Event where idCode=?1",nativeQuery = true)
    Event getEventByCode(Long code);

    @Query(value="INSERT INTO Reviews(idCitizen, idEvent, review) VALUES(?1,?2,?3)", nativeQuery = true)
    void addReviewEvent(Long idCitizen, Long idEvent, String Review);
}
