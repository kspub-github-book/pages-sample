import numpy as np
import tensorflow as tf
from tensorflow import keras

import tensorflowjs as tfjs


def create_model():
    model = keras.Sequential([
        keras.layers.Flatten(input_shape=(28, 28)),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dense(10, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model


model = create_model()
model.load_weights('model')

test_input = np.zeros(28 * 28).reshape((1, 28, 28))
predictions = model.predict(test_input)

print()
print('Predictions for zero input')
print(predictions[0])

tfjs.converters.save_keras_model(model, "model")
print()
print('Model was exported.')
