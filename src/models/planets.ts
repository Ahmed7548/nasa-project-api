const planets=[{id:"A",name:"planet-1"},{id:"B",name:"planet-2"}]

class Planet {
 
  constructor() {
    
  }

  static async getPlanets() {
    return planets
  }
  static async getPlanet(id:string) {
    return planets.find(planet=>planet.id===id)
  }
}



export default Planet