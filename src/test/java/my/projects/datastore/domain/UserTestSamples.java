package my.projects.datastore.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UserTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static User getUserSample1() {
        return new User()
            .id(1L)
            .externalUserId("externalUserId1")
            .username("username1")
            .firstName("firstName1")
            .lastName("lastName1")
            .email("email1");
    }

    public static User getUserSample2() {
        return new User()
            .id(2L)
            .externalUserId("externalUserId2")
            .username("username2")
            .firstName("firstName2")
            .lastName("lastName2")
            .email("email2");
    }

    public static User getUserRandomSampleGenerator() {
        return new User()
            .id(longCount.incrementAndGet())
            .externalUserId(UUID.randomUUID().toString())
            .username(UUID.randomUUID().toString())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString());
    }
}
