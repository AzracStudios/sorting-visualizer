export const mergeSortAlgorithm = (array) => {
  const merge = (
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };

  const _mergeSort = (
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    _mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    _mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };

  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  _mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

export const bubbleSortAlgorithm = (array) => {
  const animations = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const animation = { comparison: null, swap: null };
      animation.comparison = [j, j + 1];

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        animation.swap = [j, j + 1];
      }

      animations.push(animation);
    }
  }

  return animations;
};

export const quickSortAlgorithm = (array) => {
  let anim = [];

  const partition = (array, low, high, animations) => {
    let pivot = array[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {

      if (array[j] < pivot) {
        animations.push({ comparison: [j, high], swap: null });
        i++;

        animations.push({ comparison: null, swap: [i, j] });
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }

    animations.push({ comparison: null, swap: [i + 1, high] });
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    return { pi: i + 1, animations };
  };

  const _quickSort = (array, low, high) => {
    if (low < high) {
      let { pi, animations } = partition(array, low, high, anim);
      anim = animations;

      _quickSort(array, low, pi - 1);
      _quickSort(array, pi + 1, high);
    }
  };

  _quickSort(array, 0, array.length - 1);
  return anim;
};

export const heapSortAlgorithm = (array) => {
  let animations = [];
  let n = array.length;

  const _heapSort = (array, n, i) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) {
      animations.push({ comparison: [l, largest], swap: null });
      largest = l;
    }

    if (r < n && array[r] > array[largest]) {
      animations.push({ comparison: [r, largest], swap: null });
      largest = r;
    }

    if (largest !== i) {
      animations.push({ comparison: null, swap: [i, largest] });
      let swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;

      _heapSort(array, n, largest);
    }
  };

  for (let i = Math.floor(n / 2); i >= 0; i--) {
    _heapSort(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ comparison: null, swap: [0, i] });

    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    _heapSort(array, i, 0);
  }

  return animations;
};
