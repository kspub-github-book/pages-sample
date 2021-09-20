# MNSIT Check

## Summary

Sample codes to train some model with TensorFlow (Keras), to export the trained model, and to import the model to TensorFlow.js.

## Usage

You need TensorFlow and TensorFlow.js. If you do not have them yet, install them as follows.

```sh
pip install tensorflow
pip install tensorflowjs
```

### Train a model

Train a model and save the trained model.

```sh
$ python3 train.py
(snip)
Model was saved.
```

You will have the following files.

* model.data-00000-of-00001
* model.index

### Export the trained model

Load the trained model and export it for TensorFlow.js.

```sh
$ python3 export.py
(snip)
Model was exported.
```

Then you will have the following directory which contains the exported model for TensorFlow.js.

```txt
model
├── group1-shard1of1.bin
└── model.json
```

## Licence

CC0
