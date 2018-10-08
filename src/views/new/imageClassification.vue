<template>
	<div class="imageClassification page">
    <template v-if="!num_classes">
      <ClassesNumber v-model="num_classes" subTitle="for image classification"/>
    </template>
    <template v-else>
      <div class="tabs">
        <ul>
          <li v-for="(item, i) in tabs" v-on:click="selectedTab = i" v-bind:class="{'is-active': selectedTab == i}"><a>{{item.text}}</a></li>
        </ul>
      </div>
      <div v-show="selectedTab == 0">
        <div class="columns is-gapless">
          <div class="column is-narrow import-data">
            <div class="camera">
              <video id="webcam" autoplay playsinline muted width="224" height="224"></video>
              <div class="button is-primary is-medium" v-on:click="setExampleData" v-bind:class="{'is-loading': !addButton}">Add Photo</div>
            </div>
            {{ num_classes }}
          </div>
          <div class="column is-1 label-list">
            <div v-for="i in num_classes">
              <a class="panel-block" v-on:click="selectedLabel = i" v-bind:class="{'is-active': selectedLabel === i }">
              Label {{ i }}
              </a>  
            </div>
            <!-- <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                reset all data
              </button>
            </div> -->
          </div>
          <div class="column">
            <div class="columns is-multiline is-mobile">
              <div v-for="uuid in images[selectedLabel]" class="column is-2">
                <canvas :ref="'thumb-' + uuid" width="224" height="224"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selectedTab == 1">
        Train & Run
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
  data () {
    return {
      selectedTab: 0,
      selectedLabel: 0,
      webcam: null,
      webcamReady: false,
      num_classes: 0,
      controllerDataset: null,
      mobilenet: null,
      model: null,
      images: {'0': []},
      tabs: [
        {icon: '', text: 'Data'},
        {icon: '', text: 'Train & Run'}
      ],
      addButton: true
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
        this.webcamReady = true
      } catch (e) {
        console.log('Webcam block')
      }
      this.controllerDataset = new this.$ControllerDataset(this.num_classes)
    },
    async loadMobilenet () {
      this.mobilenet = await this.$tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
      var layer = this.mobilenet.getLayer('conv_pw_13_relu')
      return this.$tf.model({inputs: this.mobilenet.inputs, outputs: layer.output})
    },
    setExampleData: function () {
      this.addButton = false
      var self = this
      var img = self.webcam.capture()
      self.controllerDataset.addExample(self.mobilenet.predict(img), self.selectedLabel, function (res) {
        self.addImage(img)
      })
    },
    addImage: function (image) {
      var self = this
      var uuid = new this.$guid().new()
      self.images[self.selectedLabel].push(uuid)
      setTimeout(function () {
        self.drawImage(image, uuid)
      }, 500)
    },
    drawImage: function (image, uuid) {
      var [width, height] = [224, 224]
      var canvas = this.$refs['thumb-' + uuid][0].getContext('2d')
      const imageData = new ImageData(width, height)
      const data = image.dataSync()
      for (let i = 0; i < height * width; ++i) {
        const j = i * 4
        imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127
        imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127
        imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127
        imageData.data[j + 3] = 255
      }
      canvas.putImageData(imageData, 0, 0)
      this.addButton = true
    }
  },
  watch: {
    num_classes: function () {
      if (this.num_classes > 0) {
        var self = this
        setTimeout(function () {
          self.init()
        }, 100)
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
.label-list {
  min-width: 150px;
}

</style>
