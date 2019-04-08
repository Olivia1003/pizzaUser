import Toast from 'react-native-root-toast'

export function showToast(info: string, d: string = 'short') {
    Toast.show(info, {
        position: Toast.positions.CENTER,
        hideOnPress: true,
        duration: d === 'short' ? Toast.durations.SHORT : Toast.durations.LONG
    })
}