import numpy as np
import tensorflow as tf
from tensorflow import keras


def get_data():
    mnist = keras.datasets.mnist
    (train_images, train_labels), (test_images,
                                   test_labels) = mnist.load_data()
    train_images = train_images / 255.0
    test_images = test_images / 255.0
    return(train_images, train_labels, test_images, test_labels)


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


(train_images, train_labels, test_images, test_labels) = get_data()


model = create_model()

model.fit(train_images, train_labels, epochs=5)

test_loss, test_acc = model.evaluate(test_images, test_labels)

print('\n')
print('Test accuracy: {}\n'.format(test_acc))

test_input = np.zeros(28 * 28).reshape((1, 28, 28))
predictions = model.predict(test_input)

print('Predictions for zero input')
print(predictions[0])

model.save_weights('model')
print()
print('Model was saved.')
