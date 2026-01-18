import { describe, it, expect, vi } from 'vitest'
import { generateDanfeByInvoiceCode } from '../services/danfe.service.js'
import * as nfService from '../services/nf.service.js'
import * as danfeUtil from '../utils/generateDanfe.js'

describe('generateDanfeByInvoiceCode', () => {
  it('deve gerar PDF e retornar XML quando NF é válida', async () => {
    const fakeXml = '<xml>nota fiscal</xml>'
    const fakePdf = Buffer.from('pdf-content')

    vi.spyOn(nfService, 'getNFById').mockResolvedValue({
      success: true,
      nota_fiscal: {
        NotaFiscalXML: fakeXml,
      },
    })

    vi.spyOn(danfeUtil, 'generateDanfe').mockResolvedValue(fakePdf)

    const result = await generateDanfeByInvoiceCode(123)

    expect(result).toHaveProperty('pdfBuffer')
    expect(result).toHaveProperty('xml')
    expect(result.xml).toBe(fakeXml)
    expect(result.pdfBuffer).toEqual(fakePdf)
  })

  it('deve lançar erro quando XML não existe', async () => {
    vi.spyOn(nfService, 'getNFById').mockResolvedValue({
      success: true,
      nota_fiscal: {},
    })

    await expect(
      generateDanfeByInvoiceCode(123)
    ).rejects.toThrow('XML da NF não encontrado')
  })
})
