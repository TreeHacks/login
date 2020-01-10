const commonConfig = {
    "globals": {
        "MODE": "DEV",
        ENDPOINT_URL: "/api"
    },
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.svg$": "jest-svg-transformer"
    },
    "moduleNameMapper": {
        "^.+\\.(css|scss|png|ico)$": "identity-obj-proxy",
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
};
module.exports = {
    "projects": [
        {
            ...commonConfig,
            "name": "frontend",
            "testMatch": [
                "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)"
            ],
            "setupFilesAfterEnv": ["./src/setupTests.ts"],
            "snapshotSerializers": [
                "enzyme-to-json/serializer"
            ]
        },
        {
            ...commonConfig,
            "name": "backend",
            "testEnvironment": "node",
            "testMatch": [
                "<rootDir>/backend/**/__tests__/**/*.[jt]s?(x)"
            ]
        },
    ]
};