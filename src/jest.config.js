export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
export const transform = {
    '^.+\\.(ts|tsx)$': 'ts-jest',
};
export const moduleNameMapper = {
    // Mock CSS imports
    '\\.(css|less)$': 'identity-obj-proxy',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const roots = ['<rootDir>/src'];
export const testMatch = ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'];

