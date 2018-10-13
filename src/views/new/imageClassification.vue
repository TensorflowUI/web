<template>
	<div class="imageClassification page">
    <template v-if="labels.length === 0">
      <ClassesNumber v-model="labels" subTitle="for image classification"/>
    </template>
    <template v-else>
      <div class="columns is-gapless">
        <div class="column is-narrow import-data">
          <div class="camera">
            <video id="webcam" autoplay playsinline muted width="224" height="224"></video>
          </div>
          <div class="train">
            <div class="columns">
              <div class="column">
                <div class="button is-primary is-medium is-fullwidth is-gapless" v-on:click="startTrain">Train</div>
              </div>
              <div class="column">
                <div class="button is-primary is-medium is-fullwidth is-gapless" v-on:click="startPredict">Run</div>
              </div>
            </div>
            <p><strong>Loss:</strong> {{ loss }}</p>
          </div>
          <div>
            <!-- Hyper params. -->
            <div class="hyper-params">

              <!-- Learning rate -->
              <div class="field">
                <div class="control">
                  <label>Learning rate</label>
                  <div class="select is-fullwidth">
                    <select v-model="form.learningRate">
                      <option value="0.00001">0.00001</option>
                      <option value="0.0001">0.0001</option>
                      <option value="0.01">0.001</option>
                      <option value="0.03">0.003</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Batch size -->
              <div class="field">
                <div class="control">
                  <label>Batch size</label>
                  <div class="select is-fullwidth">
                    <select v-model="form.batchSizeFraction">
                      <option value="0.05">0.05</option>
                      <option value="0.1">0.1</option>
                      <option value="0.4">0.4</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Epochs -->
              <div class="field">
                <div class="control">
                  <label>Epochs</label>
                  <div class="select is-fullwidth">
                    <select v-model="form.epochs">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="40">40</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Hidden units -->
              <div class="field">
                <div class="control">
                  <label>Hidden units</label>
                  <div class="select is-fullwidth">
                    <select v-model="form.denseUnits">
                      <option value="10">10</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>
              </div>

            </div><!-- /.hyper-params -->
          </div>
        </div>
        <div class="column">
          <div id="labels" class="columns is-narrow is-multiline is-mobile">
              <div v-for="(item, i) in labels" class="card column is-narrow is-paddingless" v-bind:class="{'isActive': activeLabel === i}">
                <div class="card-content">
                  <canvas :ref="'label' + i" width="224" height="224"></canvas>
                </div>
                <footer class="card-footer">
                  <p class="card-footer-item">
                    <span>
                      <a class="button is-white" disabled>Upload Image</a>
                    </span>
                  </p>
                  <p class="card-footer-item">
                    <span>
                      <a class="button is-white" v-on:click="setExampleData(i)">Add Photo</a>
                    </span>
                  </p>
                </footer>
              </div>
          </div>
        </div>
      </div>
    </template>
	</div>
</template>
<script>
import ClassesNumber from '@/components/imageClassification/classesNumber'
export default {
  name: 'ImageClassification',
  components: {
    ClassesNumber
  },
  metaInfo: {
    title: 'Image Classification',
    titleTemplate: '%s - TensorFlowUI',
    meta: [
      {name: 'description', content: 'Image classification via Tensorflow UI.'}
    ]
  },
  data () {
    return {
      isPredicting: false,
      activeLabel: -1,
      labels: [],
      webcam: null,
      controllerDataset: null,
      mobilenet: null,
      model: null,
      tabs: [
        {icon: '', text: 'Data'},
        {icon: '', text: 'Train & Run'}
      ],
      form: {
        learningRate: '0.0001',
        batchSizeFraction: '0.4',
        epochs: '20',
        denseUnits: '100'
      },
      loss: 0
    }
  },
  mounted: function () {
    this.loadMobilenet()
  },
  methods: {
    init: function () {
      this.webcam = new this.$Webcam(document.getElementById('webcam'))
      try {
        this.webcam.setup()
      } catch (e) {
        console.log('Webcam block')
      }
      this.controllerDataset = new this.$ControllerDataset(this.labels.length)
    },
    loadMobilenet: async function () {
      const mobilenet = await this.$tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
      var layer = mobilenet.getLayer('conv_pw_13_relu')
      this.mobilenet = this.$tf.model({inputs: mobilenet.inputs, outputs: layer.output})
    },
    startTrain: function () {
      console.log('Training...')
      this.$tf.nextFrame()
      this.$tf.nextFrame()
      this.isPredicting = false
      this.train()
    },
    startPredict: function () {
      this.isPredicting = true
      this.predict()
    },
    train: async function () {
      var self = this
      if (this.controllerDataset.xs == null) {
        alert('Add some examples before training!')
        return
      }

      // Creates a 2-layer fully connected model. By creating a separate model,
      // rather than adding layers to the mobilenet model, we "freeze" the weights
      // of the mobilenet model, and only train weights from the new model.
      this.model = this.$tf.sequential({
        layers: [
          // Flattens the input to a vector so we can use it in a dense layer. While
          // technically a layer, this only performs a reshape (and has no training
          // parameters).
          this.$tf.layers.flatten({inputShape: [7, 7, 256]}),
          // Layer 1
          this.$tf.layers.dense({
            units: parseFloat(this.form.denseUnits),
            activation: 'relu',
            kernelInitializer: 'varianceScaling',
            useBias: true
          }),
          // Layer 2. The number of units of the last layer should correspond
          // to the number of classes we want to predict.
          this.$tf.layers.dense({
            units: this.labels.length,
            kernelInitializer: 'varianceScaling',
            useBias: false,
            activation: 'softmax'
          })
        ]
      })

      // Creates the optimizers which drives training of the model.
      const optimizer = this.$tf.train.adam(parseFloat(this.form.learningRate))
      // We use categoricalCrossentropy which is the loss function we use for
      // categorical classification which measures the error between our predicted
      // probability distribution over classes (probability that an input is of each
      // class), versus the label (100% probability in the true class)>
      this.model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'})

      // We parameterize batch size as a fraction of the entire dataset because the
      // number of examples that are collected depends on how many examples the user
      // collects. This allows us to have a flexible batch size.
      const batchSize = Math.floor(this.controllerDataset.xs.shape[0] * parseFloat(this.form.batchSizeFraction))
      if (!(batchSize > 0)) {
        throw new Error(`Batch size is 0 or NaN. Please choose a non-zero fraction.`)
      }

      // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
      this.model.fit(this.controllerDataset.xs, this.controllerDataset.ys, {
        batchSize,
        epochs: parseFloat(this.form.epochs),
        callbacks: {
          onBatchEnd: async (batch, logs) => {
            self.loss = logs.loss.toFixed(5)
          }
        }
      })
    },
    predict: async function () {
      var self = this
      while (self.isPredicting) {
        const predictedClass = self.$tf.tidy(() => {
          const img = self.webcam.capture()
          const activation = self.mobilenet.predict(img)
          // Make a prediction through our newly-trained model using the activation
          // from mobilenet as input.
          const predictions = self.model.predict(activation)
          // Returns the index with the maximum probability. This number corresponds
          // to the class the model thinks is the most probable given the input.
          return predictions.as1D().argMax()
        })

        this.activeLabel = (await predictedClass.data())[0]
        predictedClass.dispose()
        await self.$tf.nextFrame()
      }
    },
    setExampleData: function (labelNumber) {
      var img = this.webcam.capture()
      this.controllerDataset.addExample(this.mobilenet.predict(img), labelNumber)
      this.drawImage(img, labelNumber)
      this.labels[labelNumber]++
    },
    drawImage: function (image, labelNumber) {
      var [width, height] = [224, 224]
      var canvas = this.$refs['label' + labelNumber][0]
      var context = canvas.getContext('2d')
      const imageData = new ImageData(width, height)
      const data = image.dataSync()
      for (let i = 0; i < height * width; ++i) {
        const j = i * 4
        imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127
        imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127
        imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127
        imageData.data[j + 3] = 255
      }
      context.putImageData(imageData, 0, 0)
      context.font = '15px Arial, "Helvetica Neue", Helvetica, sans-serif'
      context.fillStyle = '#ff6200'
      context.fillText(this.labels[labelNumber], 10, canvas.height - 10)
    }
  },
  watch: {
    labels: function () {
      if (this.labels.length > 0) {
        var self = this
        setTimeout(function () {
          self.init()
        }, 500)
      }
    }
  }
}
</script>
<style scoped>
.import-data {
  max-width: 300px;
}
.camera {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px !important;
  margin-right: 10px;
}
.train {
  margin: 15px 10px 5px 0px;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 15px;
}
.label-list {
  min-width: 150px;
}
#labels {
  margin: 0 0 15px 10px;
}
#labels .card {
  margin: 0 15px 15px 0;
}
#labels .card.isActive {
  border: 4px solid #ff6000;
  margin: -4px 12px 11px -5px;
}
.hyper-params {
  padding: 15px 10px 0 0; 
}
@media only screen and (max-width: 600px) {
  #labels {
    margin: 10px 10px 0 0;
  }
}
</style>
