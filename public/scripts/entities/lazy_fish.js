class LazyFish extends Fish {

  constructor(options) {
    super(options); // Call super to run the code inside `Fish`'s constructor
    this.imageUri = '/images/lazy-fish.png'; // Set the image
    this.ttl = options.ttl || randRangeInt(3, 6);
  }

  onClick(event) {
    this.makeNewVelocity(50);
  }

  beEaten() {
    if (this.position === BiteFish.position) {
      this.kill();
    }
  }
}
