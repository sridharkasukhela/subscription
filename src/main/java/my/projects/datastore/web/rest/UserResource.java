package my.projects.datastore.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import my.projects.datastore.domain.User;
import my.projects.datastore.repository.UserRepository;
import my.projects.datastore.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link my.projects.datastore.domain.User}.
 */
@RestController
@RequestMapping("/api/users")
public class UserResource {

    private static final Logger LOG = LoggerFactory.getLogger(UserResource.class);

    private static final String ENTITY_NAME = "user";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    public UserResource(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /users} : Create a new user.
     *
     * @param user the user to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new user, or with status {@code 400 (Bad Request)} if the user has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<User> createUser(@RequestBody User user) throws URISyntaxException {
        LOG.debug("REST request to save User : {}", user);
        if (user.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", ENTITY_NAME, "idexists");
        }
        user = userRepository.save(user);
        return ResponseEntity.created(new URI("/api/users/" + user.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, user.getId().toString()))
            .body(user);
    }

    /**
     * {@code PUT  /users/:id} : Updates an existing user.
     *
     * @param id the id of the user to save.
     * @param user the user to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user,
     * or with status {@code 400 (Bad Request)} if the user is not valid,
     * or with status {@code 500 (Internal Server Error)} if the user couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id", required = false) final Long id, @RequestBody User user)
        throws URISyntaxException {
        LOG.debug("REST request to update User : {}, {}", id, user);
        if (user.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, user.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        user = userRepository.save(user);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, user.getId().toString()))
            .body(user);
    }

    /**
     * {@code PATCH  /users/:id} : Partial updates given fields of an existing user, field will ignore if it is null
     *
     * @param id the id of the user to save.
     * @param user the user to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user,
     * or with status {@code 400 (Bad Request)} if the user is not valid,
     * or with status {@code 404 (Not Found)} if the user is not found,
     * or with status {@code 500 (Internal Server Error)} if the user couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<User> partialUpdateUser(@PathVariable(value = "id", required = false) final Long id, @RequestBody User user)
        throws URISyntaxException {
        LOG.debug("REST request to partial update User partially : {}, {}", id, user);
        if (user.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, user.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<User> result = userRepository
            .findById(user.getId())
            .map(existingUser -> {
                if (user.getExternalUserId() != null) {
                    existingUser.setExternalUserId(user.getExternalUserId());
                }
                if (user.getUsername() != null) {
                    existingUser.setUsername(user.getUsername());
                }
                if (user.getFirstName() != null) {
                    existingUser.setFirstName(user.getFirstName());
                }
                if (user.getLastName() != null) {
                    existingUser.setLastName(user.getLastName());
                }
                if (user.getEmail() != null) {
                    existingUser.setEmail(user.getEmail());
                }
                if (user.getRegisteredDate() != null) {
                    existingUser.setRegisteredDate(user.getRegisteredDate());
                }
                if (user.getLastLoginTime() != null) {
                    existingUser.setLastLoginTime(user.getLastLoginTime());
                }

                return existingUser;
            })
            .map(userRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, user.getId().toString())
        );
    }

    /**
     * {@code GET  /users} : get all the users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of users in body.
     */
    @GetMapping("")
    public List<User> getAllUsers() {
        LOG.debug("REST request to get all Users");
        return userRepository.findAll();
    }

    /**
     * {@code GET  /users/:id} : get the "id" user.
     *
     * @param id the id of the user to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to get User : {}", id);
        Optional<User> user = userRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(user);
    }

    /**
     * {@code DELETE  /users/:id} : delete the "id" user.
     *
     * @param id the id of the user to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete User : {}", id);
        userRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
