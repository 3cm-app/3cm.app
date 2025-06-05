import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import matter from 'gray-matter'
import _truncate from 'lodash/truncate.js'
import pkg from '../package.json' with { type: 'json' }

export const dataDirPath = path.resolve(import.meta.dirname, '..', 'public', 'data')
export const indexDirPath = path.resolve(import.meta.dirname, '..', 'public', 'index')

async function genData() {
  const result = {
    frontmatters: {
      // [id]: {
      //   ...attrs,
      //   description: '(trimmed description)...',
      //   link: links[0]
      // }
    },
    ids: [], // [id, ...]
    categories: {
      // [category]: {
      //   ids: [id, ...],
      //   count
      // }
    },
    tags: {
      // [tag]: {
      //   ids: [id, ...],
      //   count
      // }
    },
  }
  const matches = await glob(dataDirPath + '/**/*.md')
  for (const f of matches) {
    const p = path.parse(f)
    const id = p.name
    const mdPath = '/' + path.join(path.relative(path.join(import.meta.dirname, '..', 'static'), p.dir), p.base)
    const url = `https://${pkg.name}${mdPath}`
    if (result.ids.indexOf(id) > -1) {
      throw new Error(`Duplicate id (${id}) in file (${f})`)
    }
    result.ids.push(id)
    const { data } = matter.read(f)
    result.frontmatters[id] = {
      ...data,
      description: _truncate(data.description, {
        length: 255
      }),
      url,
      path: mdPath,
    }
    if (result.categories.hasOwnProperty(data.category)) {
      result.categories[data.category].ids.push(id)
      result.categories[data.category].count++
    } else {
      result.categories[data.category] = {
        ids: [id],
        count: 1
      }
    }
    for (const tag of data.tags) {
      if (result.tags.hasOwnProperty(tag)) {
        result.tags[tag].ids.push(id)
        result.tags[tag].count++
      } else {
        result.tags[tag] = {
          ids: [id],
          count: 1
        }
      }
    }
  }
  return result
}

export async function gen() {
  console.log(2)
  const data = await genData()
  console.log(data)
  for (const [k, o] of Object.entries(data)) {
    switch(k) {
      case 'frontmatters': {
        const dir = path.join(indexDirPath, k)
        fs.mkdirSync(dir, { recursive: true })
        Object.entries(o).map(([id, v]) => {
          fs.writeFileSync(path.join(dir, id + '.json'), JSON.stringify(v))
        })
        break;
      }
      default:
        fs.writeFileSync(path.join(indexDirPath, k + '.json'), JSON.stringify(o))
    }
  }
}
