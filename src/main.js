import kaboom from "kaboom"

kaboom({
	background: [25,2,0]
});

const PARTICLE_COUNT = 100;
//var CURRENT_PARTICLE = 0;
loadSprite("bean", "sprites/bean.png");
loadSprite("blackhole", "sprites/Blackhole1.png");

const effects = {
	crt: () => ({
		"u_flatness": 3,
	}),
	vhs: () => ({
		"u_intensity": 12,
	}),
};

console.log(effects)
for (const effect in effects) {
	console.log(effect)
	//loadShaderURL(effect, null, `shaders/${effect}.frag`);
	console.log(effect)
}
const effect = Object.keys(effects)[1]
//usePostEffect(effects, effects[effect]())
console.log(effect);
// Particles (stars)
function spawnParticle() {

	// Set particle velocity
	const speed = rand(0, 5);

	const particle = add([
		pos(rand(width()), rand(height())), // Position the particle at the mouse cursor
		circle(rand(3), rand(3)),      // Small circle particle
		color(255,255,255), // Random color
		//lifespan(50),     // Particle lives for 1 second
		//offscreen({ destroy: true }),
		move(0, speed),
	]);


}

function spawnParticles(count) {
	for (let i = 0; i < count; i++) {
		spawnParticle();
		//CURRENT_PARTICLE++;
	}
}

// This function is constantly spawning the obstacle for the player
// each time it collides with the spaceship aka player it will deduct one life point
function spawnBullets(count) {

}


// Render background



// Render spaceship

// scene("main", () => {

// 	add([
// 		pos(width()/2 , height()/2),
// 		sprite("blackhole"),
// 	]);

// 	onClick(() => addKaboom(mousePos()));
// });

// Spawn particle before blackhole to keep blackhole priority
spawnParticles(PARTICLE_COUNT);

// Render blackhole (controller)
// If player is to close to the blackhole the player lose all the hp
const blackhole = add([
	pos(width()/2 , height()/2),
	sprite("blackhole"),
	area(),
	anchor("center"),
	rotate(0),
	"gravity",
	"enviroment_controller",
]);

const player = add([
 	sprite("bean"),
 	area(),
 	health(5),
	anchor("center"), 	
//tags 
 	"player",
	
 	//
 	{
 		alive: true,
 		speed: 100,
 	}
 ]);

// Rotate player (spaceship)
player.onUpdate(() => {
    // Calculate the player's angle around the black hole
    player.angleOffset += dt(); // Adjust this to control the rotation speed

    // Calculate the new position relative to the black hole
    const radius = 300; // Distance between the player and the black hole
    const x = blackhole.pos.x + radius;
    const y = blackhole.pos.y + radius;
	console.log( x,y)
    // Update the player's position
    player.pos = vec2(x, y);
    
    // Optionally, make the player face outward or rotate with the movement
    //player.angle = 10; // Convert radians to degrees
});


// Rotate blackhole
blackhole.onUpdate(() => {
	blackhole.angle += 10 * dt();
	//spawnParticles(PARTICLE_COUNT);
});

//start("main");

