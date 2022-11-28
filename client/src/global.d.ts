declare global {
	interface Window {
		ethereum: import('ethers').providers.ExternalProvider;
	}
}

interface ImportMetaEnv {
	VITE_CONTRACT_ADDRESS: string;
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {}