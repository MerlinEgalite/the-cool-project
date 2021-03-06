import { useContext } from 'react'
import { Button } from 'antd'

import Web3Modal from 'web3modal'
import AppContext from '../utils/app-context'

import { Web3Provider } from '@ethersproject/providers'

export default function WalletButton(): JSX.Element {
	const context = useContext(AppContext)
	const web3Modal: Web3Modal | undefined | null = context?.web3Modal

	const logoutOfWeb3Modal = function (): void {
		if (web3Modal) web3Modal.clearCachedProvider()
		window.location.reload()
	}

	const loadWeb3Modal = async function (): Promise<void> {
		const provider = await web3Modal?.connect()
		if (context?.setWeb3Provider) {
			context.setWeb3Provider(new Web3Provider(provider))
		}
	}

	const buttonOnClick = function (): void {
		if (!web3Modal?.cachedProvider) {
			loadWeb3Modal()
		} else {
			logoutOfWeb3Modal()
		}
	}

	return (
		<Button type="primary" size="large" onClick={buttonOnClick}>
			{web3Modal?.cachedProvider ? 'Disconnect Wallet' : 'Connect Wallet'}
		</Button>
	)
}
