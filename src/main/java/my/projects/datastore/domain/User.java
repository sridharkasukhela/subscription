package my.projects.datastore.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A User.
 */
@Document(collection = "user")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Field("external_user_id")
    private String externalUserId;

    @Field("username")
    private String username;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("email")
    private String email;

    @Field("registered_date")
    private ZonedDateTime registeredDate;

    @Field("last_login_time")
    private ZonedDateTime lastLoginTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public User id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExternalUserId() {
        return this.externalUserId;
    }

    public User externalUserId(String externalUserId) {
        this.setExternalUserId(externalUserId);
        return this;
    }

    public void setExternalUserId(String externalUserId) {
        this.externalUserId = externalUserId;
    }

    public String getUsername() {
        return this.username;
    }

    public User username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public User firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public User lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public User email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ZonedDateTime getRegisteredDate() {
        return this.registeredDate;
    }

    public User registeredDate(ZonedDateTime registeredDate) {
        this.setRegisteredDate(registeredDate);
        return this;
    }

    public void setRegisteredDate(ZonedDateTime registeredDate) {
        this.registeredDate = registeredDate;
    }

    public ZonedDateTime getLastLoginTime() {
        return this.lastLoginTime;
    }

    public User lastLoginTime(ZonedDateTime lastLoginTime) {
        this.setLastLoginTime(lastLoginTime);
        return this;
    }

    public void setLastLoginTime(ZonedDateTime lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        return getId() != null && getId().equals(((User) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "User{" +
            "id=" + getId() +
            ", externalUserId='" + getExternalUserId() + "'" +
            ", username='" + getUsername() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", registeredDate='" + getRegisteredDate() + "'" +
            ", lastLoginTime='" + getLastLoginTime() + "'" +
            "}";
    }
}
