import { dbRun, dbGet, dbAll } from '../database/database';
import { Sweet, CreateSweetDto, UpdateSweetDto, SearchQuery } from '../models/Sweet';

export class SweetService {
  async createSweet(sweetData: CreateSweetDto): Promise<Sweet> {
    const { name, category, price, quantity, description, image_url } = sweetData;

    const result = await dbRun(
      'INSERT INTO sweets (name, category, price, quantity, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, price, quantity, description || null, image_url || null]
    );

    const sweet = await dbGet('SELECT * FROM sweets WHERE id = ?', [result.lastID]) as Sweet;
    return sweet;
  }

  async getAllSweets(): Promise<Sweet[]> {
    const sweets = await dbAll('SELECT * FROM sweets ORDER BY created_at DESC') as Sweet[];
    return sweets;
  }

  async getSweetById(id: number): Promise<Sweet | undefined> {
    const sweet = await dbGet('SELECT * FROM sweets WHERE id = ?', [id]) as Sweet | undefined;
    return sweet;
  }

  async searchSweets(query: SearchQuery): Promise<Sweet[]> {
    let sql = 'SELECT * FROM sweets WHERE 1=1';
    const params: any[] = [];

    if (query.name) {
      sql += ' AND name LIKE ?';
      params.push(`%${query.name}%`);
    }

    if (query.category) {
      sql += ' AND category = ?';
      params.push(query.category);
    }

    if (query.minPrice !== undefined) {
      sql += ' AND price >= ?';
      params.push(query.minPrice);
    }

    if (query.maxPrice !== undefined) {
      sql += ' AND price <= ?';
      params.push(query.maxPrice);
    }

    sql += ' ORDER BY created_at DESC';

    const sweets = await dbAll(sql, params) as Sweet[];
    return sweets;
  }

  async updateSweet(id: number, updateData: UpdateSweetDto): Promise<Sweet | undefined> {
    const updates: string[] = [];
    const params: any[] = [];

    if (updateData.name !== undefined) {
      updates.push('name = ?');
      params.push(updateData.name);
    }
    if (updateData.category !== undefined) {
      updates.push('category = ?');
      params.push(updateData.category);
    }
    if (updateData.price !== undefined) {
      updates.push('price = ?');
      params.push(updateData.price);
    }
    if (updateData.quantity !== undefined) {
      updates.push('quantity = ?');
      params.push(updateData.quantity);
    }
    if (updateData.description !== undefined) {
      updates.push('description = ?');
      params.push(updateData.description);
    }
    if (updateData.image_url !== undefined) {
      updates.push('image_url = ?');
      params.push(updateData.image_url);
    }

    if (updates.length === 0) {
      return this.getSweetById(id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    await dbRun(
      `UPDATE sweets SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return this.getSweetById(id);
  }

  async deleteSweet(id: number): Promise<boolean> {
    const result = await dbRun('DELETE FROM sweets WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  async purchaseSweet(id: number, quantity: number): Promise<Sweet | undefined> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity in stock');
    }

    const newQuantity = sweet.quantity - quantity;
    return this.updateSweet(id, { quantity: newQuantity });
  }

  async restockSweet(id: number, quantity: number): Promise<Sweet | undefined> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const newQuantity = sweet.quantity + quantity;
    return this.updateSweet(id, { quantity: newQuantity });
  }
}

export const sweetService = new SweetService();

