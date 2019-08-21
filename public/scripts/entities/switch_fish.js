class SwitchFish extends Fish {

  constructor(options) {
    super(options); // Call super to run the code inside `Fish`'s constructor
    this.imageUri = '/images/switch-fish.png'; // Set the image
    this.height =  40; // Optional: The height of the sprite in pixels. This defaults to 60
    this.width =  40; // Optional: The width of the sprite in pixels. This defaults to 60
  }

  onClick(event) {
    this.makeNewVelocity(50);
  }
}
