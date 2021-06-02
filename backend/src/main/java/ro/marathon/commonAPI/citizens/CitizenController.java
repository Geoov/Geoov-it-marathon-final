package ro.marathon.commonAPI.citizens;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.marathon.commonAPI.code.Code;
import ro.marathon.commonAPI.code.CodeRepository;
import ro.marathon.commonAPI.config.JwtTokenUtil;
import ro.marathon.commonAPI.events.Event;
import ro.marathon.commonAPI.events.EventRepository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class CitizenController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final CitizenRepository citizenRepository;
    private final CodeRepository codeRepository;
    private final EventRepository eventRepository;

    CitizenController(CitizenRepository repository1, CodeRepository repository2, EventRepository repository3){
        this.citizenRepository=repository1;
        this.codeRepository=repository2;
        this.eventRepository=repository3;
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @PostMapping("/citizen/add")
    ResponseEntity<Integer> addCitizen(@RequestHeader("Authorization") String token,@RequestBody Map<String,String> citizen){
        String name = citizen.get("nume");
        String surname = citizen.get("prenume");
        String phone = citizen.get("telefon");
        Long id = citizenRepository.getIdCredentials(jwtTokenUtil.getUsernameFromToken(token.substring(7)));
        citizenRepository.addCitizen(id, name, surname, phone);
        return ResponseEntity.ok(201);
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @GetMapping("/citizen")
    ResponseEntity<CitizenProfile> getCitizen(@RequestHeader("Authorization") String token){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        return ResponseEntity.ok(Objects.requireNonNull(citizenRepository.findByIdCitizen(username)));
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @GetMapping("/codes")
    ResponseEntity<List<Code>> getCodesOfUser(@RequestHeader("Authorization") String token){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        return ResponseEntity.ok(Objects.requireNonNull(codeRepository.findCodesByUser(username)));
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @PostMapping("/codes/add")
    ResponseEntity<?> addCodeToUser(@RequestHeader("Authorization") String token, @RequestBody Map<String,String> code){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        Long idCode = codeRepository.checkExistence(code.get("code"));
        Long idCitizen = citizenRepository.getCitizenId(username);
        if(idCode==null)
            return ResponseEntity.ok(404);
        if(codeRepository.checkCodeToUserExistence(idCitizen, idCode)!=0)
            return ResponseEntity.ok(400);
        codeRepository.addCodeToUser(idCitizen, idCode);
        return ResponseEntity.ok(Objects.requireNonNull(eventRepository.getEventByCode(idCode)));
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @GetMapping("/points")
    ResponseEntity<Long> getPointsOfUser(@RequestHeader("Authorization") String token){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        return ResponseEntity.ok(Objects.requireNonNull(codeRepository.findPointsOfUser(username)));
    }

    @CrossOrigin(origins="*",allowedHeaders="*")
    @GetMapping("/events")
    ResponseEntity<List<Event>> getEventsOfUser(@RequestHeader("Authorization") String token){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        return ResponseEntity.ok(Objects.requireNonNull(eventRepository.getEventsForUser(username)));
    }

    @CrossOrigin(origins="*",allowedHeaders = "*")
    @GetMapping("/clasament")
    ResponseEntity<List<CitizenProfile>> getClasamentTop10(){
        return ResponseEntity.ok(Objects.requireNonNull(citizenRepository.getClasament()));
    }

    @CrossOrigin(origins="*",allowedHeaders = "*")
    @PostMapping("/reviews/add")
    void addReview(@RequestHeader("Authorization") String token, Map<String,String> review){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        Long idCitizen = citizenRepository.getCitizenId(username);
        eventRepository.addReviewEvent(idCitizen, Long.parseLong(review.get("idEvent")), review.get("review"));
    }
}
