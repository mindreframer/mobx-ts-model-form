## [1.0.9] - 2021-04-28

- fix `FormArray.removeAt` for positions less than the length of the array (duh...)

## [1.0.8] - 2021-04-26

- add `FormArray.swap`, to change order in array forms

## [1.0.7] - 2021-04-26

- add `yarn release` script to simplify the release process

## [1.0.6] - 2021-04-26

- add `FormArray.remove`, `FormArray.removeAt`, `FormArray.insertAt` functions + tests

## [1.0.5] - 2021-04-26

- Allow insertion via `splice` on FormArrays

## [1.0.4] - 2021-04-26

- add `validationEvent: true;` to all ValidationEvents, to be able to differentiate errors from other fields in nested datastructures

## [1.0.3] - 2021-04-26

- publish proper `dist` folder

## [1.0.2] - 2021-04-26

- adds `getAllErrors()` for all controls
- changes default error messages to be in English
- adds Changelog

## [1.0.1] - 2021-04-24

- adds `getValue()` for all controls, returns the datastructure representing all nested values
- reverts import-statements structure changes from 1.0.0, it was failing with `tslib` after compilation

## [1.0.0] - 2021-04-24

- forked from https://github.com/QuantumArt/mobx-form-validation-kit to be able to evolve it quicker
  - cleanup for the Readme
  - prettier formatting for all files
  - minor unifications
