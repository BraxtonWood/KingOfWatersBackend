const {

} = require('./');
const client = require('./client');

async function dropTables() {
    console.log("Dropping all tables...");

    try {
        await client.query(`
        
        DROP TABLE IF EXISTS friends;
        DROP TABLE IF EXISTS locations;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping tables");
    } catch (error){
        console.error('Error dropping tables');
        throw error;
    }
}

async function createTables() {
    console.log("Starting to build tables...");
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            bio VARCHAR(255),
            img VARCHAR(255)
            );
            `);
        await client.query(`
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            breed VARCHAR(255),
            latitude VARCHAR(50),
            longitude VARCHAR(50),
            length INTEGER,
            units VARCHAR(255),
            picture VARCHAR(255),
            description VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
            );
            `)
        await client.query(`
        CREATE TABLE follows (
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            following_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            followed_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
            );
            `);
        console.log("Finished building tables");
    } catch (error){
        console.error('Error Creating Tables');
        throw error;
    }
}

async function createInitialUsers() {
    console.log("Starting to create users...");
    try{
        const usersToCreate = [
            {username: "bobby123", password: "12345678", email: "bob123@gmail.com",
             city: "Hyrum", state:"Utah", bio:"My name is Bob and I like to fish",
            img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fc%2Fc5%2FBob_the_builder.jpg%2F220px-Bob_the_builder.jpg&tbnid=r5Z52poB6ayk4M&vet=12ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBob_the_Builder&docid=r0zgognrCAFPBM&w=220&h=333&q=bob%20the%20builder&ved=2ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ",
            },
            {username: "bobby456", password: "12345678", email: "bob456@gmail.com",
             city: "Hyrum", state:"Utah", bio:"My name is Bob and I like to fish",
            img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fc%2Fc5%2FBob_the_builder.jpg%2F220px-Bob_the_builder.jpg&tbnid=r5Z52poB6ayk4M&vet=12ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBob_the_Builder&docid=r0zgognrCAFPBM&w=220&h=333&q=bob%20the%20builder&ved=2ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ",
            },
            {username: "bobby789", password: "12345678", email: "bob789@gmail.com",
             city: "Hyrum", state:"Utah", bio:"My name is Bob and I like to fish",
            img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fc%2Fc5%2FBob_the_builder.jpg%2F220px-Bob_the_builder.jpg&tbnid=r5Z52poB6ayk4M&vet=12ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBob_the_Builder&docid=r0zgognrCAFPBM&w=220&h=333&q=bob%20the%20builder&ved=2ahUKEwjstZ7f0v3-AhUeh-4BHZ2yCYIQMygAegUIARD0AQ",
            }
        ]
        const users = await Promise.all(usersToCreate.map(createUser))
        console.log("Users Created:");
        console.log(users);
        console.log("Finished Creating users");
    } catch(error) {
        console.error("Error creating users");
        throw error;
    }
}

async function createInitialPosts() {
    console.log("Creating initial posts....");
    try{
        const postsToCreate = [
            {title: "A big one", breed:"Tiger-Musky", latitude:"41.6274", longitude:"111.8666",
             length: 20, units: "Inches", picture:"", 
             description:"I was barely able to real this bad boy in", user_id: 1 
            },
            {title: "A big one", breed:"Tiger-Musky", latitude:"41.6274", longitude:"111.8666",
             length: 20, units: "Inches", picture:"", 
             description:"I was barely able to real this bad boy in", user_id: 3 
            },
            {title: "A big one", breed:"Tiger-Musky", latitude:"41.6274", longitude:"111.8666",
             length: 20, units: "Inches", picture:"", 
             description:"I was barely able to real this bad boy in", user_id: 2 
            }
        ]
        const posts = await Promise.all(postsToCreate.map(createPost));
        console.log("Posts Created:");
        console.log(posts);
        console.log("Finished creating posts");
    }catch(error){
        console.error("Error creating posts");
        throw error;
    }
}