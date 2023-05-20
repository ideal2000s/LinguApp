module.exports = {
  roots: ['<rootDir>/frontend', '<rootDir>/frontend/students'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css'
  },
  setupFilesAfterEnv: ['<rootDir>/frontend/students/jest.setup.ts'],
  testPathIgnorePatterns: ['node_modules', '__mocks__'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '\\.(svg|png|webp|mp3)': '<rootDir>/frontend/__mocks__/fileMock.ts'
  },
  modulePaths: ['<rootDir>/frontend'],
  globals: {
    __IDLE_TIMER__: 30000,
    __PING_TIMER__: 5000
  }
};
