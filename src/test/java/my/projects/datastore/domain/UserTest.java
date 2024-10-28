package my.projects.datastore.domain;

import static my.projects.datastore.domain.UserTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import my.projects.datastore.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(User.class);
        User user1 = getUserSample1();
        User user2 = new User();
        assertThat(user1).isNotEqualTo(user2);

        user2.setId(user1.getId());
        assertThat(user1).isEqualTo(user2);

        user2 = getUserSample2();
        assertThat(user1).isNotEqualTo(user2);
    }
}
