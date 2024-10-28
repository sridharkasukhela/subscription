package my.projects.datastore;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import my.projects.datastore.config.AsyncSyncConfiguration;
import my.projects.datastore.config.EmbeddedMongo;
import my.projects.datastore.config.JacksonConfiguration;
import my.projects.datastore.config.TestSecurityConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = { SubscriptionApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class }
)
@EmbeddedMongo
public @interface IntegrationTest {
}
