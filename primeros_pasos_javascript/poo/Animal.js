class Animal {
  constructor(name, gender) {
    this.name = name
    this.gender = gender
  }

  run () {
    console.log('ruunn ruunnn 💨')
  }

  sleep () {
    console.log('Zzzzz')
  }
}

class Dog extends Animal {
  constructor(name, gender, breedOfDog) {
    super(name, gender)
    this.breedOfDog = breedOfDog
  }

  guauGuau () {
    console.log('guau guau')
  }

  getBreedOfDog () { // se trata como un atributo
    return this.breedOfDog
  }

  setBreedOfDog (value) {
    this.breedOfDog = value
  }
}

const dog = new Dog('sebastian', 'macho', 'pastor aleman')
dog.guauGuau()
dog.run()
