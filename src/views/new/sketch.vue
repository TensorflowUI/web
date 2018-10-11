<template>
	<div>
      <div id='output'>{{sketchResult}}</div>
	</div>
</template>

<script>
// https://medium.freecodecamp.org/get-to-know-tensorflow-js-in-7-minutes-afcd0dfd3d2f
// example from
export default {
  name: 'sketch',
  components: {},
  data () {
    return {
      sketchResult: 'DEMO'
    }
  },
  mounted: function () {
    var self = this
    setTimeout(function () {
      self.predictOutput()
    }, 500)
  },
  methods: {
    predictOutput: function () {
      const model = this.$tf.sequential()
      // config for layer
      const configHidden = {
        inputShape: [3],
        activation: 'sigmoid',
        units: 4
      }
      const configOutput = {
        units: 2,
        activation: 'sigmoid'
      }
      // defining the hidden and output layer
      const hidden = this.$tf.layers.dense(configHidden)
      const output = this.$tf.layers.dense(configOutput)
      // adding layers to model
      model.add(hidden)
      model.add(output)
      // define an optimizer
      const optimize = this.$tf.train.sgd(0.1)
      // config for model
      const config = {
        optimizer: optimize,
        loss: 'meanSquaredError'
      }
      // compiling the model
      model.compile(config)
      console.log('Model Successfully Compiled')
      // Dummy training data
      const xTrain = this.$tf.tensor([
        [0.1, 0.5, 0.1],
        [0.9, 0.3, 0.4],
        [0.4, 0.5, 0.5],
        [0.7, 0.1, 0.9]
      ])
      // Dummy training labels
      const yTrain = this.$tf.tensor([
        [0.2, 0.8],
        [0.9, 0.1],
        [0.4, 0.6],
        [0.5, 0.5]
      ])
      // Dummy testing data
      const xTest = this.$tf.tensor([[0.9, 0.1, 0.5]])

      this.trainData(xTrain, yTrain, model).then(function () {
        console.log('Training is Complete')
        console.log('Predictions :')
        model.predict(xTest).print()
      })
    },
    async trainData (xTrain, yTrain, model) {
      for (let i = 0; i < 10; i++) {
        const res = await model.fit(
          xTrain,
          yTrain,
          1000,
          10
        )
        console.log(res.history.loss[0])
      }
    }
  },
  watch: {}
}
</script>
<style scoped>
</style>
