let data = 'old';

export function select(id: string) {
    return new Promise<string>(res => setTimeout(() => res(data), 3000))
}

export function update(id: string, newData: string) {
    return new Promise((resolve) => setTimeout(() => {
        data = newData;
        resolve(data);
    }, 3000))
}
