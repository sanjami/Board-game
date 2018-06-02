
class LevelCompleted {
    constructor(name) {
        this.name = name;
        this.times = [];
    }
    addTime = (time) => {
        this.times.push(time)
    }

}

export default LevelCompleted;
