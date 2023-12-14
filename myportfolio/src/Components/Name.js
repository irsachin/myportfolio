// Name.js

import React, { useEffect } from 'react';
import '../css/name.css';

class RandomCharacterAnimation {
  constructor(options) {
    this.options = options;
    this.currentChange = 0;
    this.getLettersArray = [];
    this.getLettersChanges = [];

    if (options.d_type === 'char') {
      this.char = options.d_char || 'abcdefghijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;\'"\\|<>,./~`×';
    }

    this._getElementSize();
    this._setStructure();
    this._setChange();
    this._loop();
  }

  _random(minNb, maxNb) {
    return Math.floor(Math.random() * (maxNb - minNb) + minNb);
  }

  _getElementSize() {
    const element = document.querySelector(this.options.d_element);
    const elementText = element.textContent;

    for (let i = 0; i < elementText.length; i++) {
      this.getLettersArray.push(elementText[i]);
    }
  }

  _setStructure() {
    const element = document.querySelector(this.options.d_element);
    element.innerHTML = '';

    for (let i = 0; i < this.getLettersArray.length; i++) {
      const characterContainer = document.createElement('span');
      characterContainer.classList.add('randomCharacter');
      element.appendChild(characterContainer);
      characterContainer.appendChild(document.createTextNode(this.getLettersArray[i]));
    }
  }

  _setChange() {
    for (let i = 0; i < this.getLettersArray.length; i++) {
      this.getLettersChanges.push(this._random(this.options.d_min, this.options.d_max));
    }
  }

  _generateRandomCharacter() {
    this.currentChange++;

    const chooseRandomLetter = this._random(0, this.getLettersArray.length);
    const changesPlaces = document.querySelector(`${this.options.d_element} .randomCharacter:nth-child(${chooseRandomLetter + 1})`);

    let generateContent;
    if (this.options.d_type === 'int') {
      generateContent = this._random(0, 9);
    } else if (this.options.d_type === 'char') {
      const getChar = this._random(0, this.char.length);
      generateContent = this.char[getChar];
    } else {
      const getChar = this._random(0, this.options.d_type.length);
      generateContent = this.options.d_type[getChar];
    }

    changesPlaces.innerHTML = generateContent;
    changesPlaces.style.opacity = '1';

    // If animation is completed, set the final content
    if (this.currentChange === this.options.d_max) {
      this.getLettersArray.forEach((char, index) => {
        const finalContent = document.querySelector(`${this.options.d_element} .randomCharacter:nth-child(${index + 1})`);
        finalContent.innerHTML = char;
      });
    }
  }

  _checkNbChanges() {
    for (let i = 0; i < this.getLettersArray.length; i++) {
      const setContent = this.getLettersArray[i];
      const thisContainer = document.querySelector(`${this.options.d_element} .randomCharacter:nth-child(${i + 1})`);

      if (this.currentChange > this.getLettersChanges[i]) {
        thisContainer.innerHTML = setContent;
      }
    }
  }

  _loop() {
    if (this.currentChange <= this.options.d_max) {
      this._generateRandomCharacter();
      this._checkNbChanges();
      requestAnimationFrame(() => this._loop());
    }
  }
}

const Name = () => {
  useEffect(() => {
    const yourNameAnimation = new RandomCharacterAnimation({
      d_element: '.your-name',
      d_type: 'char', // 'int' for numbers, 'char' for characters, or provide a string of characters
      d_min: 10,
      d_max: 100,
    });

    // Cleanup on component unmount
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return <h1 className="random your-name">Sachin Singh Rathore </h1>;
};

export default Name;
