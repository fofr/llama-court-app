class CaseAgent {
  constructor(data) {
    this.mood = data.mood;
    this.name = data.name;
    this.beliefs = data.beliefs;
    this.summary = data.summary;
    this.image_uri = data.image_uri;
    this.description = data.description;
    this.guilty_percent = data.guilty_percent;
    this.speak_eagerness = data.speak_eagerness;
    this.agent_sentiments = data.agent_sentiments;
    this.innocent_percent = data.innocent_percent;
    this.latest_sentiment = data.latest_sentiment || '';
    this.latest_utterance = data.latest_utterence || '';
  }

  updateSentiment(sentiment) {
    this.latest_sentiment = sentiment;
  }

  updateUtterance(utterance) {
    this.latest_utterance = utterance;
  }
}

export default CaseAgent;
